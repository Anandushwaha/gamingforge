import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  teamName: { type: String, required: true },
  teamMembers: [
    {
      name: { type: String, required: true },
      class: { type: String, required: true },
    },
  ],
  collegeName: { type: String, required: true },

  playedValorant: { type: Boolean, required: true },
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
