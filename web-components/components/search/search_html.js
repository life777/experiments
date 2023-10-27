const template = document.createElement('template');
template.innerHTML = `
  <style>
    .wrapper {
      width: 100%;
      display: flex;
    }

    search {
        flex: 1 1 auto;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;

      &:active {
        background-color: green;
      }
    }
  </style>
  <div class="wrapper">
    <input class="search" type="search">
    <button class="submit">Search</button>
  </div>`;

export { template };