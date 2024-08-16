import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Data/Types";
import { jsPDF } from "jspdf";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import {
  total,
  totalTaxed,
  totalUntaxed,
  breakdown,
  summaries,
  mileageRate,
} from "../Data/results";

/*
export const calculate = (projects: Container) => {
  console.log(JSON.stringify(projects));
  console.log(projects);
  total.value = 0;
  totalTaxed.value = 0;
  totalUntaxed.value = 0;
  breakdown.forEach((item) => {
    item.sum = 0;
  });

  for (let p = 0; p < projects.length; p++) {
    for (let e = 0; e < projects[p].expenses.length; e++) {
      // cost calculations
      let cost = projects[p].expenses[e].cost;
      if (cost !== null && typeof cost === "number" && cost >= 0) {
        total.value += cost;
      } else {
        console.log("invalid cost returned");
      }
    }
  }

  console.log("total: ", total.value);
  console.log("total taxed: ", totalTaxed.value);
  console.log("total untaxed: ", totalUntaxed.value);
  console.log(breakdown);
};
*/
