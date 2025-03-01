import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message?: string; error?: string; };

const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const email = req.body.email;
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
  const AUDIENCE_ID = process.env.MAILCHIMP_LIST_ID;

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    if (response.status == 200) {
      return res.status(201).json({ message: "You have successfully subscribed!" });
    }
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      console.error(
        `${error.response?.status}`,
        `${error.response?.data.title}`,
        `${error.response?.data.detail}`
      );

      if (error.response?.data.title == "Member Exists") {
        return res.status(400).json({
          error: "it looks like this email's already subscribed",
        });
      }
    }

    return res.status(500).json({
      error:
        "Oops! There was an error subscribing you to the newsletter.",
    });
  }
};

export default subscribeHandler;