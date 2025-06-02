'use strict';

const $root = document.getElementById('studentContainer');
let cards = '';

fetch('file.json')
  .then((res) => res.json())
  .then((info) => {
    for (let i = 0; i < info.length; i++) {
      cards += `
        <div class="card">
          <img src="https://github.com/${info[i].usernameGithub}.png" class="card-img-top" alt="Foto de ${info[i].student}">
          <div class="card-body">
            <h5 class="card-title">${info[i].student}</h5>
            <p>ID: ${info[i].code || 'No disponible'}</p>
          </div>
          <div class="card-body">
            <a href="https://github.com/${info[i].usernameGithub}" class="card-link" target="_blank">Ver perfil de GitHub</a>
          </div>
        </div>
      `;
    }

    $root.innerHTML = cards;
  })
  .catch((err) => {
    console.log('error:', err);
    $root.innerHTML = '<p>Hubo un problema al cargar los estudiantes.</p>';
  });


//------------------------------------------------

// const $root = document.getElementById("root")

// let cards = `
// <div class="card">
// `;

// fetch('file.json')
//   .then((res) => res.json())
//   .then((info) => {
//     for (let i = 0; i < info.length; i++) {
//       cards += `
// <div class="card">
// <img src="..." class="card-img-top" alt="...">
// <div class="card-body">
// <h5 class="card-title">${info[i].student}
// </div>
// <div class="card-body">
// <a href="#" class="card-link">Card link</a>
// </div>
// </div>`;
//     }
//     cards += '</div>';
//     $root.innerHTML = cards;
//   })
//   .catch((err) => {
//     console.log('error:', err);
//   });