import mongoose from "mongoose";
import { CountryType } from "interfaces/CountryType";

// Define a schema
const Schema = mongoose.Schema;

const CountryModelSchema = new Schema<CountryType>(
    {
        continent_name: String,
        country_code: {
            type: String,
            required: true,
        },
        country_name: String,
        continent_code: String,
        capital_name: String,
        currency_code: String,
        phone_code: String,
        three_letter_country_code: String,
    },
    { timestamps: true }
);

export default mongoose.model('Country', CountryModelSchema);