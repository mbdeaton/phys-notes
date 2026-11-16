export default function AboutPage() {
  return (
    <main className="about-page">
      <h1>About</h1>
      <p>
        A collection of short notes to young people interested in physics.
        Prompted by photographs of everyday observations.
      </p>
      <p>
        Website is React/TypeScript/Vite. Client-side routing and posts managed
        in Sanity. Frontend and Sanity Studio source code available at{" "}
        <a href="https://github.com/mbdeaton/phys-notes">phys-notes</a>,{" "}
        <a href="https://github.com/mbdeaton/studio-phys-notes">
          studio-phys-notes
        </a>
        .
      </p>
      <p>
        Author/Developer: Brett Deaton, physicist and software engineer living
        in the US, inland northwest.
      </p>
      <p>
        Unless otherwise noted, original writing and photographs licensed under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
        Please credit Brett Deaton, link to the license, and indicate if you
        made changes.
      </p>
    </main>
  );
}
