import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { user } from "user-profile";
import * as util from "../common/utils";

// General
const background = document.getElementById("background");


// Update the clock every minute
clock.granularity = "minutes";

// Time Elements
const myLabel = document.getElementById("myLabel");
const minutes = document.getElementById("mins");
let hours;

  // Update the <text> element every tick with the current time
  clock.ontick = function(evt) {
            let today = evt.date;
            hours = today.getHours(); 
            let mins = util.zeroPad(today.getMinutes());

            if (preferences.clockDisplay === "12h") {
                // 12h format
                hours = hours % 12 || 12; 
            } 
            else {
                hours = util.zeroPad(hours);
            }
          
            // <text> elements
            myLabel.text = `${hours}`;
            minutes.text = `${mins}`;
       };
    
/*
* Data: 
* Steps
* HR
* Calories
*/

const steps = document.getElementById("steps");
const stepspic = document.getElementById("stepspic");

let hrm = new HeartRateSensor();
const hrmval = document.getElementById("hrm");
const hrmpic = document.getElementById("hrpic");

const cals = document.getElementById("cals");
const calspic = document.getElementById("calspic");

  function stepsData(steps, stepsPic) {
        steps.text = today.adjusted.steps || 0;
    }

  function hrData(hr, hrm) {
        hrm.onreading = function() {
            hr.text = hrm.heartRate;
            // Stop monitoring the sensor
            hrm.stop();
        };

        hrm.start();
    }

   function calsData(cals, calsPic) {
        cals.text = today.adjusted.calories;
    }

// Update Users stats

function updateData() {
    stepsData(steps, stepspic);
    hrData(hrmval, hrm);
    calsData(cals, calspic);
}

setInterval(updateData, 1000);
