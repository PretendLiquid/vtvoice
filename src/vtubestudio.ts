import React from 'react';
import * as vtubestudio from 'vtubestudio';

export class VClient {
    plugin!: vtubestudio.Plugin
    wsw: WebSocketWrapper

    constructor(websocketUrl: string = 'ws://localhost:8001') {
        this.wsw = new WebSocketWrapper(websocketUrl);

        const bus = new vtubestudio.WebSocketBus(this.wsw.ws);
        const apiClient = new vtubestudio.ApiClient(bus)
        this.plugin = new vtubestudio.Plugin(apiClient, 'vtvoice', 'PretendLiquid', undefined, localStorage.getItem('vtvoice') ?? undefined, token => localStorage.setItem('vtvoice', token))
    }
}

export class WebSocketWrapper {
    private _url: string;
    ws!: WebSocket;
    reconnect() {
        this.ws = new WebSocket(this._url);
    }

    constructor(url: string) {
        this._url = url;
        this.reconnect();
    }
}

type props = {
    host?: string;
    port?: string;
}

export function useVClient(props: props) {
    const [connected, setConnected] = React.useState(false);
    const [apiError, setApiError] = React.useState<Error | null>(null)

    const client = React.useMemo(() => {
        const client = new VClient(props.host ? `ws://${props.host}:${props.port}` : undefined);
        client.wsw.ws.addEventListener('open', () => setConnected(true));
        client.wsw.ws.addEventListener('close', () => setConnected(false));
        return client
    }, [])

    const runCommand = React.useCallback(async (callBack: () => Promise<void>) => {
        try {
            await callBack();
        } catch (e: any) {
            if (!String(e).includes('Plugin could not authenticate')) {
                console.error('Error excuting VTube Studio command' + e);
                setApiError(e);
            } else {
                setConnected(false);
            }
        }
    }, []);

    return { connected, apiError , client, runCommand }
}

