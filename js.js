const poke_container = document.getElementById('poke_container');
const pokemons_number = 1015;
const colors = {
	fire: '#fc7a28',
	grass: '#21ff3b',
	electric: '#edcf3b',
	water: '#29adff',
	ground: '#b89042',
	rock: '#6e521b',
	fairy: '#e647cb',
	poison: '#6e0be6',
	bug: '#68e34f',
	dragon: '#0532fa',
	psychic: '#fa0567',
	flying: '#2ad4d1',
	fighting: '#e01919',
	normal: '#f7f0f0'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	let type1 = main_types.find(type => poke_types.indexOf(type) > -1);
	let type2 = "";
	if (poke_types.length > 1) {
		type2 = main_types.find(type => type !== type1 && poke_types.indexOf(type) > -1);
	}

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type1];

	pokemonEl.style.backgroundColor = color;

	let pokeInnerHTML = `
        <div class="img-container">
            <img src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type1}</span>`;
			

	if (type2 !== "") {
		pokeInnerHTML += ` / <span>${type2}</span>`;
	}
	pokeInnerHTML += `</small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

const typeSelect = document.getElementById('type-select');
typeSelect.addEventListener('change', () => {
  const selectedType = typeSelect.value;
  filterPokemons(selectedType);
});

function filterPokemons(type) {
	const pokemonCards = document.querySelectorAll('.pokemon');
	pokemonCards.forEach(card => {
	  const typeSpan = card.querySelector('.type span');
	  if (type === 'all' || typeSpan.textContent.toLowerCase() === type) {
		card.style.display = 'block';
	  } else {
		card.style.display = 'none';
	  }
	});
  }

fetchPokemons();



