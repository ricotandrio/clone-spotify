# Spotify Clone

My fun project, a Spotify clone featuring CRUD operations, was created using React.js and Tailwind CSS. This project utilizes the Spotify API to retrieve and display specific data, while also use Firebase to store account progress. It represents a creative endeavor that allowed me to replicate some of Spotify's functionalities for learning and practice. By leveraging React.js and Tailwind CSS, I've developed a user interface that closely resembles Spotify's design, while utilizing the Spotify API to access relevant information. 

## Folder Tree
```
src
├───apis                    # interfacing with external APIs
│   ├───firebase_services   # function for firebase APIs request
│   └───spotify_services    # function for spotify APIs request
├───assets                  # store static files
│   ├───fonts               # font files used in this app
│   └───images              # contain images 
│       ├───icon            # images related to icon
│       └───spotify         # images related to spotify 
├───components              # reusable react component
├───configs                 # project app configuration
├───contexts                # react context api
├───datas                   # store static data 
├───pages                   # react pages component
├───utils                   # helper function
```

## Quick Start
To begin, clone this repository to your local machine and use npm to install the necessary modules.

```bash
git clone https://github.com/ricotandrio/clone-spotify.git
cd clone-spotify
npm install
```

To run the development server, create a `.env` file and fill it with your own Firebase authentications details and Spotify client ID. Then, execute the following command:
```bash
npm run dev
```

## Live Demo
You can visit the live version of the website at https://clone-spotify-deployment.netlify.app.

## Vite + React + Javascript
**The development environment is set up using Vite.js:**
Vite.js template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
