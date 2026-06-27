// src/deriv.ts
export class DerivConnection {
  private socket: WebSocket;
  private app_id = '1089';

  constructor(onTick: (tick: any) => void) {
    this.socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${this.app_id}`);
    
    this.socket.onopen = () => console.log("Connected to Deriv API");
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.tick) onTick(data.tick);
    };
  }

  public authorize(token: string) {
    this.socket.send(JSON.stringify({ authorize: token }));
  }
}

