import User from "../models/user.model";

export const generatePMI = async () => {
  let pmi: number = 1000000;
  let isUnique = false;
  while (!isUnique) {
    pmi = Math.floor(1000000 + Math.random() * 9000000);
    const existingUser = await User.findOne({ pmi });
    if (!existingUser) {
      isUnique = true;
    }
  }
  return pmi;
};
