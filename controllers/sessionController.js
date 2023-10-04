const Session = require("../models/session");

const allSessions = async (req, res) => {
  try {
    const freeSessions = [
      { wardenId: "wardenB456", day: "Thursday", time: "10:00 AM" },
      { wardenId: "wardenB456", day: "Friday", time: "10:00 AM" },
    ];
    return res.json(freeSessions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const bookSession = async(req ,res)=>{
  try{
    const { wardenId, day, time } = req.body;
    const bookedSession = new Session({
      wardenId,
      day,
      time,
      bookedBy: req.userId,
    });
    await bookedSession.save();
    return res.json({ message: 'Session booked successfully.' });
  }catch(error){
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const listSessionPending = async(req,res)=>{
  try{
    const pendingSessions = await Session.find({ wardenId: 'wardenB456' });
    res.json(pendingSessions);
  }catch(error){
    console.error(error);
    return res.status(500).json({error:"Internal Server Error"})
  }
}
module.exports = { allSessions , bookSession,listSessionPending};