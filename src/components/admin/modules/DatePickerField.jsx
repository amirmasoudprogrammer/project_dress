import React from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {SlCalender} from "react-icons/sl";

function DatePickerField({value,label,onChange}) {
    return (
        <div className="flex flex-col flex-1">
            <label className="block text-xs font-semibold mb-1">{label}</label>
            <div className="flex items-center border p-2 rounded-lg">
                <DatePicker
                    value={value}
                    onChange={onChange}
                    calendar={persian}
                    locale={persian_fa}
                    plugins={[<TimePicker position="bottom" />]}
                    calendarPosition="bottom-right"
                    style={{ border: "none", fontSize: "14px", textAlign: "center", width: "100%" }}
                />
                <SlCalender className="text-xl ml-2" />
            </div>
        </div>
    );
}

export default DatePickerField;