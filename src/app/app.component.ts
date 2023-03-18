import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ColorsGPT';

    public input: string;
    public isLoading: boolean = false;

    public colors: Color[] = [];

    constructor() {
        this.input = '';
    }

    public async getColors() {
        this.isLoading = true;
        console.log(this.input);
        let resp = await this.callColorsFunction();
        const colors = resp.colors;
        if (colors) {
            colors.forEach((color: string) => {
                this.colors.push(new Color(color));
            });
        }
        console.log(colors);
        this.isLoading = false;
    }

    public async callColorsFunction() {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ vibe: this.input })
        };
        const response = await fetch(environment.AZURE_FUNC_URL, requestOptions);
        return response.json();
    }

    async copyToClipboard(text: string): Promise<void> {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Text copied to clipboard:', text);
        } catch (err) {
          console.error('Failed to copy text:', err);
        }
      }
}

export class Color {
    public hex: string;
    constructor(hex: string) {
        this.hex = hex;
    }

    public getHex() {
        return "#" + this.hex;
    }
}