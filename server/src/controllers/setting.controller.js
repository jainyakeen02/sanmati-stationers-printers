import Setting from "../models/Setting.js";
import asyncHandler from "../utils/asyncHandler.js";

const DEFAULT_KEY = "website";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne({ key: DEFAULT_KEY });

  res.status(200).json({
    success: true,
    data: settings || { key: DEFAULT_KEY },
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOneAndUpdate(
    { key: DEFAULT_KEY },
    { ...req.body, key: DEFAULT_KEY },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Website settings updated successfully.",
    data: settings,
  });
});
