import * as React from "react";
import { Paper, Box } from "@mui/material";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  DayView,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  Toolbar,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { owners } from "../demo-data/task";
import { appointments, resourcesData } from "../demo-data/resources";
import {
  StyledPaper,
  LayoutContent,
  SchedulerCustom,
  ToolbarCustom,
  ViewSwticherCustom,
  Content,
  HeaderContent,
  AppointmentFormLayout,
  AppointmentFormCommandLayout,
  classes,
  AppointmentEl,
  AppointmentContent,
} from "../styled/Appointment";
import axios from "axios";
import moment from "moment";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Customer's Name" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.first_name + " " + appointmentData.last_name}
        onValueChange={onCustomFieldChange}
        placeholder="Custom field"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resources: [],
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.getResources = this.getResources.bind(this);
    this.currentData = this.currentDate;
    this.theme = this.theme;
  }

  componentDidMount() {
    this.getResources();
  }

  componentWillUnmount() {
    this.getResources();
  }

  theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: purple[800],
      },
      secondary: {
        main: green.A400,
      },
    },
    typography: {
      color: "#fff",
    },
  });

  getResources() {
    axios
      .get("/services/import")
      .then((res) => {
        console.log(res.data, "import!!!!");
        this.setState((state) => {
          return {
            resources: [
              {
                fieldName: "services",
                title: "Services",
                instances: res.data.data.map((v, i) => {
                  let color = "#FFA7d6";
                  switch (i) {
                    case 0:
                      color = "#7E57C2";

                    case 1:
                      color = "#FF7ab3";

                    case 2:
                      color = "#e91e63";
                    case 3:
                      color = "#AB47BC";
                    case 4:
                      color = "#FFA726";
                  }
                  return {
                    id: v.shopify_id,
                    text: v.title,
                    color: color,
                  };
                }),
                allowMultiple: true,
              },
            ],
          };
        });
        // console.log(res.data.data[0].services);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/appointments/all")
      .then((res) => {
        console.log(res.data, "DATA FROM SERVER");
        console.log(res, "imported FROM SERVER");
        this.setState((state) => {
          let data = res.data.data.map((v) => {
            let first_name;
            let last_name;

            if (v.customer) {
              first_name = v.customer.first_name;
              last_name = v.customer.last_name;
            } else {
              first_name = "";
              last_name = "";
            }

            return {
              id: v._id,
              title: "Consultation",
              services: v.services.map((b) => {
                return b.shopify_id;
              }),
              serviceInfo: v.services.map((b) => {
                return {
                  shopify_id: b.shopify_id,
                  id: b._id,
                  details: b.details,
                  title: b.title,
                  image: b.image,
                  status: b.active,
                  tags: b.tags,
                };
              }),
              first_name: first_name,
              last_name: last_name,
              startDate: new Date(v.startDate),
              endDate: new Date(v.endDate),
            };
          });
          return {
            data: data,
          };
        });
      })
      .then((data) => console.log(this.state))
      .catch((error) => {
        console.log(error);
      });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources } = this.state;

    return (
      <ThemeProvider theme={this.theme}>
        <Box>
          <StyledPaper elevation={8} background="transparent">
            <Scheduler data={data} rootComponent={SchedulerCustom}>
              <ViewState defaultCurrentDate={moment()} />
              <EditingState onCommitChanges={this.commitChanges} />
              <EditRecurrenceMenu />
              <IntegratedEditing />
              {/* <DayView startDayHour={9} endDayHour={14} />
          <WeekView
            // timeTableCellComponent={TimeTableCell}
            startDayHour={10}
            endDayHour={19}
          /> */}
              <MonthView />
              <Toolbar rootComponent={ToolbarCustom} />
              <ViewSwitcher switcherComponent={ViewSwticherCustom} />
              <DateNavigator />
              <TodayButton />
              <Appointments
                appointmentComponent={AppointmentEl}
                appointmentContentComponent={AppointmentContent}
              />
              <AppointmentTooltip
                showOpenButton
                contentComponent={Content}
                headerComponent={HeaderContent}
              />
              <AppointmentForm
                layoutComponent={AppointmentFormLayout}
                commandLayoutComponent={AppointmentFormCommandLayout}
                basicLayoutComponent={BasicLayout}
                textEditorComponent={TextEditor}
              />

              <Resources data={resources} mainResourceName="services" />
              <DragDropProvider />
            </Scheduler>
          </StyledPaper>
        </Box>
      </ThemeProvider>
    );
  }
}
