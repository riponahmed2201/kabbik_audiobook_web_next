import { getSessionInit, getSessionLog } from "@/utils/apiServices";

const apiCallInterval = 10000;

export default class SessionManager {
  id: number | null;
  sessionType: "Activity" | "Stream";
  play: boolean;
  interval: number;
  episodeId: number | null;
  timer: any;

  constructor(id: number | null, episodeId: number | null) {
    this.sessionType = "Activity";
    this.id = id;
    this.episodeId = episodeId;
    this.play = false;
    this.interval = apiCallInterval;
    this.pauseSession = this.pauseSession.bind(this);
    this.startSession = this.startSession.bind(this);
    this.init = this.init.bind(this);
    this.log = this.log.bind(this);
    this.timer = null;
  }

  pauseSession() {
    this.play = false;
    clearInterval(this.timer);
    this.timer = null;
  }

  startSession(isPlaying: boolean) {
    this.play = this.id === null || this.id === undefined ? false : true;
    this.timer = setInterval(async () => this.log(isPlaying), this.interval);
  }

  async init(audiobookId: number, episodeId: number) {
    getSessionInit(audiobookId, episodeId);
  }

  async log(isPlaying: boolean) {
    getSessionLog(isPlaying);
  }
}
