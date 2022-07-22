import Shopify from "@shopify/shopify-api";
import AppointmentModel from "../models/Appointment";
import ServiceModel from "../models/Service";
import StoreModel from "../models/storeModel";
import data from "../appointmentData";

const seedAppointments = async (req, res, next) => {
  try {
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);

    const store = await StoreModel.findOne({ shop: session.shop });
    await AppointmentModel.deleteMany({});
    await StoreModel.updateMany({ shop: session.shop }, { appointments: [] });

    const dataWithStore = data.map((v) => {
      return {
        ...v,
        store: store._id,
      };
    });

    await AppointmentModel.insertMany(dataWithStore);
    // dataWithStore.map(async (v) => {

    // })

    const services = await ServiceModel.find({ shop: store._id });

    console.log(services);
    const servicesID = services.map((v) => v._id);
    await AppointmentModel.updateMany({}, { services: [] });
    await AppointmentModel.updateMany({}, { $push: { services: servicesID } });

    const appointments = await AppointmentModel.find({}).populate(
      "services.service",
      "shopify_id"
    );

    const aptId = appointments.map((v) => {
      return v._id;
    });

    await StoreModel.updateMany(
      { shop: session.shop },
      { $push: { appointments: aptId } }
    );

    const storeAppointments = await StoreModel.find({
      shop: session.shop,
    })
      .populate("appointments _id")
      .exec();

    const appointmentsWithServices = await AppointmentModel.find({}).populate(
      "services",
      "service title details duration shopify_id status tags image"
    );
    console.log(
      appointmentsWithServices[0].services,
      "appointmentsWithServices! MIDDLEWARE"
    );

    res.locals.appData = appointmentsWithServices;
  } catch (error) {
    console.log(error, "ERROR IN SEED APPOINTMENTS MIDDLEWARE");
  }

  next();
};

export default seedAppointments;
