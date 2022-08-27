<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** Reference link notation in markdown. Look at the bottom of the file
*** for all links to the shields.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/PattyCoding123/whatsup">
    <img src="public/logo.png" alt="Logo" width="80" height="80">
  </a>
  
<h1 align="center">WhatsUp</h1>

  <p align="center">
    "WhatsUp" is a project in which I created a simple clone of the WhatsApp web application
    with one-to-one messaging.
    <br />
    <a href="https://github.com/PattyCoding123/whatsup"><strong>Check out the docs »</strong></a>
    <br />
    <br />
    <a href="https://whatsup-pattycoding123.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/PattyCoding123/whatsup/issues">Report Bug</a>
    ·
    <a href="https://github.com/PattyCoding123/whatsup/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project is my attempt at creating a clone of the WhatsApp website with full one-to-one 
messaging functionality. I utilized React and Next.js for the frontend and Firebase
for backend authentication and data storage. Next.js was used for server-side rendering
to help populate the chats with messages without them needing to load from Firebase.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Next.js][Next.js]][Next-url]
* [![Firebase][Firebase-shield]][Firebase-url]
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

First, run npm install to acquire dependencies
```bash
npm install
# or
yarn add
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Log in by pressing the "Sign in with Google" button.
2. Click the "START A NEW CHAT" button start looking for a new chat.
The browser will prompt you to enter an email.
3. Once the chat begins, you can send messages to the recipient.
4. To log out, click your profile picture on the top left of the Sidebar.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Authentication (user sign in and sign out)
- [x] Server-side rendering
- [x] Real-time updates for activity and messages

See the [open issues](https://github.com/PattyCoding123/whatsup/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this project better or more optimal, please fork the repo and create a pull request. Alternatively, you can open an issue with the tag "enhancement" as well.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Patrick Ducusin - patrickducusin2@gmail.com

Project Link: [https://github.com/PattyCoding123/whatsup](https://github.com/PattyCoding123/whatsup)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/PattyCoding123/whatsup?color=%23808080&style=for-the-badge
[license-url]: https://github.com/PattyCoding123/whatsup/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/patrick-ducusin-879b25208/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Firebase-shield]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
