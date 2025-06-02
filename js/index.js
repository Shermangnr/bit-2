'use strict';

const $root = document.getElementById('studentContainer');
const $modal = new bootstrap.Modal(document.getElementById('studentModal'));
const $studentName = document.getElementById('studentName');
const $studentPhoto = document.getElementById('studentPhoto');
const $projectsList = document.getElementById('projectsList');
const $loadMoreBtn = document.getElementById('loadMoreBtn');

const $searchInput = document.getElementById('searchInput');

let studentsData = [];
let visibleCount = 0;
const cardsPerLoad = 12;
let filteredStudentsData = []; // Para almacenar los resultados filtrados

fetch('file.json')
  .then((res) => res.json())
  .then((info) => {
    studentsData = info;
    filteredStudentsData = [...studentsData]; // Inicialmente, todos los estudiantes
    renderCards();
  })
  .catch((err) => {
    console.error('Error al cargar datos:', err);
    $root.innerHTML = '<p>Hubo un problema al cargar los estudiantes.</p>';
  });

function renderCards() {
  const slice = filteredStudentsData.slice(0, visibleCount + cardsPerLoad); // Mostrar los primeros
  let cards = '';

  slice.forEach((student, i) => {
    const globalIndex = i;
    const username = student.usernameGithub || 'github';

    cards += `
      <div class="col">
        <div class="card h-100 shadow-sm student-card" data-index="${globalIndex}" style="cursor: pointer;">
            <div class="cont-fotos">
              <h5> BIT </h5>
              <img src="https://github.com/${username}.png" class="card-img-top" alt="Foto de ${student.student}">
            </div>
          <div class="card-body">
            <h5 class="card-title">${student.student}</h5>
            <p class="m-0">Desarrollador Web</p>
            <p class="mt-1">ID No: 54697-${student.code || 'No disponible'}</p>
            <a href="https://github.com/${username}" class="card-link" target="_blank">GitHub <i class="bi bi-github"></i></a>
          </div>
        </div>
      </div>
    `;
  });

  $root.innerHTML = cards;

  document.querySelectorAll('.student-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = card.getAttribute('data-index');
      showStudentModal(slice[index]); // Usar slice para obtener el estudiante correcto
    });
  });

  visibleCount = slice.length; // Actualizar visibleCount

  // Mostrar/Ocultar el botón "Mostrar más"
  if (visibleCount < filteredStudentsData.length) {
    $loadMoreBtn.style.display = 'inline-block';
  } else {
    $loadMoreBtn.style.display = 'none';
  }
}

function filterAndRenderCards() {
  const searchTerm = $searchInput.value.toLowerCase();
  filteredStudentsData = studentsData.filter(student =>
    student.student.toLowerCase().includes(searchTerm) ||
    (student.code && student.code.toLowerCase().includes(searchTerm))
  );

  visibleCount = 0; // Resetear la paginación
  renderCards();
}

function showStudentModal(student) {
  const username = student.usernameGithub || 'github';

  $studentPhoto.src = `https://github.com/${username}.png`;
  $studentPhoto.alt = `Foto de ${student.student}`;
  $studentName.textContent = student.student;
  $projectsList.innerHTML = '';

  student.projects.forEach(project => {
    const average = (project.score.length > 0)
      ? (project.score.reduce((a, b) => a + b, 0) / project.score.length).toFixed(2)
      : 'Sin datos';

    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = `<strong>${project.name}</strong> - Promedio: ${average}`;
    $projectsList.appendChild(item);
  });

  $modal.show();
}

$loadMoreBtn.addEventListener('click', () => {
  renderCards(); // Simplemente renderiza más
});

$searchInput.addEventListener('input', filterAndRenderCards);