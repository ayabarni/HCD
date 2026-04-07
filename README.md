Test vragen:

-Zou jij een vast startpunt willen instellen?
-Welk onderdeel zou jij kiezen?
-Is dit handig of overbodig?
-Zou je liever iets anders kiezen als startpunt?
-welke apps Ihab gebruikt het meeste?
-wat heeft hij nodig?
-hij leest of niet?
-wat zijn interesses?
aannamens:
-hij is blend
-hij gebruikt screenreaders
-hij is zelfstandig




<header>
    <h1>Boekenapp</h1>
</header>

<nav>
    <ul>
        <li><a href="#mijn-boeken">Mijn boeken</a></li>
        <li><a href="#favorieten">Favorieten</a></li>
        <li><a href="#zoeken">Zoeken</a></li>
    </ul>
</nav>

<main>

    <!-- voorkeuren -->
    <section class="voorkeuren">
        <h2>Kies je startpunt</h2>

        <label>
            <input type="radio" name="startpunt" value="mijn-boeken">
            Mijn boeken
        </label>

        <label>
            <input type="radio" name="startpunt" value="favorieten">
            Favorieten
        </label>

        <label>
            <input type="radio" name="startpunt" value="zoeken">
            Zoeken
        </label>

        <button type="button" id="opslaan">Ga naar mijn startpunt</button>
    </section>

    <!-- sections -->
    <section id="mijn-boeken" tabindex="-1">
        <h2>Mijn boeken</h2>
        <ul>
            <li>The Hobbit</li>
            <li>Pride and Prejudice</li>
            <li>Atomic Habits</li>
        </ul>
    </section>

    <section id="favorieten" tabindex="-1">
        <h2>Favorieten</h2>
        <ul>
            <li>Harry Potter</li>
            <li>The Alchemist</li>
        </ul>
    </section>

    <section id="zoeken" tabindex="-1">
        <h2>Zoeken</h2>
        <label for="search">Zoek een boek</label>
        <input type="text" id="search">
        <button>Zoeken</button>
    </section>

</main>









* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  background: #f6f6f6;
  color: #111;
  line-height: 1.5;
}

/* layout */
header,
nav,
main {
  max-width: 50rem;
  margin: 0 auto;
  padding: 1rem;
}

/* nav */
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #003082;
  font-weight: bold;
}

/* sections */
section {
  background: white;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
}

/* voorkeuren */
.voorkeuren label {
  display: block;
  margin: 0.5rem 0;
}

/* buttons */
button {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  border: 2px solid #003082;
  background: white;
  color: #003082;
  border-radius: 0.3rem;
  cursor: pointer;
}

/* input */
input {
  padding: 0.5rem;
  margin-top: 0.5rem;
}

/* focus */
a:focus,
button:focus,
input:focus,
section:focus {
  outline: 3px solid #ffc917;
  outline-offset: 3px;
}