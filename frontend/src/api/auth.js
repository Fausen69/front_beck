const goods = [
    { id: 1, title: 'good1', desc: 'good 2 desc', price: 100, image: 'https://picsum.photos/seed/1/300/300' },
    { id: 2, title: 'good2', desc: 'good 3 desc', price: 300, image: 'https://picsum.photos/seed/2/300/300' },
    { id: 3, title: 'good3', desc: 'good 2 desc', price: 400, image: 'https://picsum.photos/seed/3/300/300' },
    { id: 4, title: 'Wireless Mouse', desc: 'Ergonomic design with silent click and long battery life.', price: 1200, image: 'https://picsum.photos/seed/4/300/300' },
    { id: 5, title: 'USB-C Hub', desc: '7-in-1 adapter with HDMI, USB, and card reader ports.', price: 2500, image: 'https://picsum.photos/seed/5/300/300' },
    { id: 6, title: 'Phone Stand', desc: 'Adjustable aluminum stand for smartphones and small tablets.', price: 650, image: 'https://picsum.photos/seed/6/300/300' },
    { id: 7, title: 'Power Bank', desc: '20000mAh fast-charging portable charger with dual output.', price: 3200, image: 'https://picsum.photos/seed/7/300/300' },
    { id: 8, title: 'Gaming Keyboard', desc: 'RGB backlit mechanical keyboard with anti-ghosting keys.', price: 5400, image: 'https://picsum.photos/seed/8/300/300' },
    { id: 9, title: 'Webcam HD', desc: '1080p webcam with built-in microphone and privacy cover.', price: 2800, image: 'https://picsum.photos/seed/9/300/300' },
    { id: 10, title: 'Desk Organizer', desc: 'Wooden tray for pens, paper clips, and small office supplies.', price: 950, image: 'https://picsum.photos/seed/10/300/300' },
    { id: 11, title: 'Wireless Charger', desc: 'Fast 15W Qi-compatible charging pad for smartphones.', price: 1800, image: 'https://picsum.photos/seed/11/300/300' },
    { id: 12, title: 'Laptop Sleeve', desc: 'Neoprene case for 13-14 inch laptops with extra pocket.', price: 1100, image: 'https://picsum.photos/seed/12/300/300' },
    { id: 13, title: 'LED Strip Lights', desc: '5m RGB color-changing lights with remote control.', price: 1400, image: 'https://picsum.photos/seed/13/300/300' },
    { id: 14, title: 'Bluetooth Earbuds', desc: 'True wireless earbuds with noise isolation and mic.', price: 3900, image: 'https://picsum.photos/seed/14/300/300' },
    { id: 15, title: 'External SSD', desc: '1TB ultra-fast portable solid state drive.', price: 8900, image: 'https://picsum.photos/seed/15/300/300' },
    { id: 16, title: 'Mini Projector', desc: 'Portable 1080p projector for home cinema experience.', price: 12000, image: 'https://picsum.photos/seed/16/300/300' },
    { id: 17, title: 'Smart Bulb', desc: 'Wi-Fi enabled color-changing LED bulb compatible with voice assistants.', price: 750, image: 'https://picsum.photos/seed/17/300/300' },
    { id: 18, title: 'Fitness Tracker', desc: 'Waterproof activity band with sleep and heart rate monitoring.', price: 2900, image: 'https://picsum.photos/seed/18/300/300' },
    { id: 19, title: 'Wireless Presenter', desc: 'Laser pointer and slide remote for presentations.', price: 1600, image: 'https://picsum.photos/seed/19/300/300' },
    { id: 20, title: 'Phone Lens Kit', desc: '3-in-1 clip-on macro, wide-angle, and fisheye lenses.', price: 1300, image: 'https://picsum.photos/seed/20/300/300' },
    { id: 21, title: 'Cable Management Set', desc: 'Velcro straps and clips to organize desk cables neatly.', price: 450, image: 'https://picsum.photos/seed/21/300/300' },
    { id: 22, title: 'Portable Monitor', desc: '15.6-inch Full HD secondary screen for laptops.', price: 14500, image: 'https://picsum.photos/seed/22/300/300' },
    { id: 23, title: 'Gaming Mouse Pad', desc: 'Extra-large stitched-edge mouse mat with smooth surface.', price: 850, image: 'https://picsum.photos/seed/23/300/300' },
    { id: 24, title: 'Digital Alarm Clock', desc: 'LED display with temperature and USB charging port.', price: 1050, image: 'https://picsum.photos/seed/24/300/300' },
    { id: 25, title: 'Wireless Doorbell', desc: 'Waterproof chime with 300m range and multiple melodies.', price: 1900, image: 'https://picsum.photos/seed/25/300/300' },
    { id: 26, title: 'Car Phone Mount', desc: 'Dashboard and air vent compatible holder with strong grip.', price: 700, image: 'https://picsum.photos/seed/26/300/300' },
    { id: 27, title: 'Noise-Canceling Headphones', desc: 'Over-ear headphones with 30-hour battery and deep bass.', price: 9500, image: 'https://picsum.photos/seed/27/300/300' },
    { id: 28, title: 'Smart Plug', desc: 'Wi-Fi outlet for remote control of any connected device.', price: 600, image: 'https://picsum.photos/seed/28/300/300' },
    { id: 29, title: 'Tablet Stylus', desc: 'Precision pen for drawing and note-taking on touchscreens.', price: 1700, image: 'https://picsum.photos/seed/29/300/300' },
    { id: 30, title: 'Wireless Keyboard', desc: 'Slim low-profile keyboard with quiet keys and long battery.', price: 2200, image: 'https://picsum.photos/seed/30/300/300' }
]

const roles = {
  0: "LOGIN",
  1: "USER",
  2: "MANAGER",
};

const users = [
  {
    id: 1,
    login: "user1",
    password: "user1",
    roleID: 1,
  },
  {
    id: 2,
    login: "manager1",
    password: "manager1",
    roleID: 2,
  },
];

export async function login(login, password) {
  const user = users.find(u => u.login === login && u.password === password);

  if (user) {
    const { password, ...dtoUser } = user;

    dtoUser.role = roles[user.roleID];
    
    return Promise.resolve(dtoUser);
  }

  return Promise.reject("user not found or wrong password");
}