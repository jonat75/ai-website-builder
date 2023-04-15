import { BuildApp } from './BuildApp.usecase';
import { FakeChatRepository } from '../../adapters/driven/repositories/FakeChatRepository';
import { FakeAIChatGateway } from '../../adapters/driven/gateways/FakeAIChatGateway';
import { AppBuilder } from '../models/AppBuilder';

const prompt = `Tu vas agir comme un developpeur frontend senior expert en React.
Je suis un serveur distant qui te fais une demande pour générer un site vitrine à partir d'une description.
Mon but est de te faire générer les fichiers contenant le code source en javascript et css nécessaires au fonctionnement de l'application pour pouvoir la déployer instantanément.
Nous allons donc établir une structure pour la réponse que tu vas me donner afin que je puisse automatiser le parsing de celle-ci.
Au début de chaque fichier tu vas écrire '#BEGIN#'
Sur la ligne suivante, tu vas écrire le chemin du fichier à partir de la racine du projet {HOME} préfixé de  '#PATH#' par exemple #PATH#{HOME}/components/test.tsx
A la fin du dernier fichier tu écriras une ligne de  '#END#'
Tu vas utiliser le framework Next.js avec Typescript.
Il faut que le site soit sur une seule page scrollable, utilises les méthodes de UX UI pour que la navigation soit agréable et jolie.
N'oublies pas d'importer le fichier css.
Voici le contexte du site: Il s'agit de faire le site vitre de la compagne Extrem Plomberie qui est une société qui vends ses services de plomberie.
Le but du site est de promouvoir les services de la société.
Ne réponds rien du tout d'autre que le code des fichiers les uns après les autres  formatés comme je te l'ai demandé.
Fais en sorte que le dernier fichier soit entièrement dans la réponse, si il ne rentre pas, ne l'écris pas, je te le demanderai dans une autre réponse.`;

describe('Build App UseCase', () => {
  let buildApp: BuildApp;
  let fakeChatRepository: FakeChatRepository;
  let fakeAIChatGateway: FakeAIChatGateway;
  let appBuilder: AppBuilder;

  beforeEach(() => {
    fakeChatRepository = new FakeChatRepository();
    fakeAIChatGateway = new FakeAIChatGateway();
    appBuilder = new AppBuilder();
    buildApp = new BuildApp(fakeAIChatGateway, fakeChatRepository, appBuilder);
  });

  it('Should build a website', async () => {
    const appContext = 'un site de plombier';
    await buildApp.execute({
      appContext,
    });
    expect(Object.values(fakeChatRepository.chats).length).toEqual(1);
    expect(fakeAIChatGateway.calls).toEqual(1);
  });
});
