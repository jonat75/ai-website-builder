import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const response = `#BEGIN#
#PATH#{HOME}/pages/index.tsx

import React from 'react';
import Head from 'next/head';
import { Hero, Services, Contact } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Extrem Plomberie</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
    </>
  );
}
#BEGIN#
#PATH#{HOME}/components/Hero.tsx

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <h1>Extrem Plomberie</h1>
      <p>Des solutions de plomberie de qualité pour vos projets</p>
    </section>
  );
};
#BEGIN#
#PATH#{HOME}/components/Services.tsx

import React from 'react';

export const Services: React.FC = () => {
  return (
    <section className="services">
      <h2>Nos services</h2>
      <ul>
        <li>Réparation et entretien de la plomberie</li>
        <li>Installation de chauffe-eau</li>
        <li>Remplacement de tuyauterie</li>
        <li>Installation de systèmes de chauffage</li>
        <li>Rénovation de salles de bains</li>
      </ul>
    </section>
  );
};
#BEGIN#
#PATH#{HOME}/components/Contact.tsx

import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section className="contact">
      <h2>Contactez-nous</h2>
      <p>
        Pour toute demande d'information ou pour un devis, n'hésitez pas à nous contacter :
      </p>
      <p>Téléphone : 01 23 45 67 89</p>
      <p>Email : contact@extremplomberie.com</p>
    </section>
  );
};
#BEGIN#
#PATH#{HOME}/public/styles.css

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: #0070f3;
  color: #fff;
  padding: 60px 0;
  text-align: center;
}

.services,
.contact {
  padding: 60px 0;
}

.services h2,
.contact h2 {
  margin-bottom: 20px;
  text-align: center;
}

.services ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.contact p {
  text-align: center;
}
#END#`;

export class AppBuilder {
  private _appHomePath: string;
  private _appsHomePath: string;
  constructor(private _chatId = 'test-site') {
    this._appHomePath = `${path.join(__dirname, '../..')}/apps/${this._chatId}`;
    this._appsHomePath = `${path.join(__dirname, '../..')}/apps`;
  }
  buildAppFromResponse(chatResponse: unknown): Promise<unknown> {
    this.buildNextSite();
    return Promise.resolve(undefined);
  }

  buildNextSite() {
    installNext(this._appsHomePath);
  }

  copyFiles(response: string) {
    const files = response.replace('#END#', '').split('#BEGIN#');
    files.shift();

    files.forEach((file) => {
      const { remainingString, extractedPath } = findAndExtractPath(file);
      const filePath = this._appHomePath + extractedPath;
      writeToFile(filePath, remainingString);
    });
  }
}

const installNext = (path: string) => {
  const exec = spawn('npx', ['create-next-app', path]);

  exec.on('error', (code) => {
    console.log('ERROR');
  });

  exec.on('close', (code) => {
    console.log('close');
  });
};

function writeToFile(filePath, content) {
  const dirPath = path.dirname(filePath);

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, content, { flag: 'w' });
}

function findAndExtractPath(inputString: string): {
  remainingString: string;
  extractedPath: string | null;
} {
  const pattern = /#PATH#\{HOME\}([a-zA-Z0-9_\-\/.]+)/;
  const match = inputString.match(pattern);

  if (match && match[0] && match[1]) {
    const remainingString = inputString.replace(match[0], '').trim();
    return { remainingString, extractedPath: match[1] };
  }

  return { remainingString: inputString, extractedPath: null };
}
