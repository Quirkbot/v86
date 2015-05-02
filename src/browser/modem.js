"use strict";

/**
 * A modem via UART, like https://github.com/ewiger/jsmodem
 * Not particlarly useful for anything, superseded by network.js
 *
 * @constructor
 */
function ModemAdapter()
{
    this.send_char = function() {};

    this.enabled = true;
    this.socket = new WebSocket("ws://localhost:2080");

    this.socket.onopen = this.onopen.bind(this);;
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onclose = this.onclose.bind(this);
    this.socket.onerror = this.onerror.bind(this);

    this.opened = false;
}

ModemAdapter.prototype.onmessage = function(e)
{
    window.console.log("onmessage", e);
};

ModemAdapter.prototype.onclose = function(e)
{
    window.console.log("onclose", e);
    this.opened = false;
};

ModemAdapter.prototype.onopen = function(e)
{
    window.console.log("open", e);
    this.opened = true;
};

ModemAdapter.prototype.onerror = function(e)
{
    window.console.log("onerror", e);
};

ModemAdapter.prototype.init = function(code_fn)
{
    this.destroy();
    this.send_char = code_fn;
};

ModemAdapter.prototype.destroy = function() 
{
};

ModemAdapter.prototype.put_chr = function(chr)
{
    window.console.log("put_chr", chr);
    if(this.opened)
    {
        this.socket.send(chr);
    }
}
