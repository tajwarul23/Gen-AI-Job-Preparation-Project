import { z } from "zod";
export const jobDescriptionSchema = z.object({
    jobDescription : z.string()
  
});

export const jobDescriptionGroqSchema = {
    type:"object",
    additionalProperties: false,
    properties:{
        jobDescription: {
    type: "string",
    description: "The description of the provided job with all the provided information also use your own ",
  },
    },
  required: ["jobDescription"]
};
