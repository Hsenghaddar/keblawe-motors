# Keblawe Motors

A responsive React and Vite dealership site with Home, Shop, About, Contact, and individual vehicle pages. React and icons are installed with npm and bundled with Vite. Hash routes work on static hosting.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

If an open PowerShell session does not recognize Node or npm after installation, restart the terminal app or refresh the session’s PATH before running the commands above:

```powershell
$env:Path = "C:\Program Files\nodejs;$env:Path"
node -v
npm.cmd -v
```

Edit vehicle listings and contact links in [src/catalog.js](src/catalog.js).

## Instagram assets

The logo, photo crops, and showroom photo are stored in `public/images/`. The C 300 AMG, E 300, and 2016 Range Rover use original highlight photos at 640 pixels wide. The white Range Rover Sport uses a reel cover and links to its walkaround. The About photo uses [this showroom reel](https://www.instagram.com/keblawe_motors1/reel/DY2RyR_IAQF/).

Vehicle information reflects the selected Instagram posts and highlights. Vehicle inquiries open WhatsApp at the dealership’s number with a draft that identifies the car. The map opens a search for the business in Ghazieh.

The Honda Civic, Jeep Grand Cherokee, and two Mercedes-Benz C 250 listings use stills from their linked reels. Model years are included where the dealer identified them in the video. Contact the showroom to confirm current availability and pricing.
