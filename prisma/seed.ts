import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordOrganisateur = await bcrypt.hash('motdepasseAdmin123', 10);
  const passwordUtilisateur = await bcrypt.hash('motdepasseUser123', 10);

  const organisateur = await prisma.user.upsert({
  where: { email: 'organisateur@eventify.com' },
  update: {},
  create: {
    email: 'organisateur@eventify.com',
    password: passwordOrganisateur,
    name: 'Organisateur',
    role: 'ORGANIZER',
  },
});

  const utilisateur = await prisma.user.create({
    data: {
      email: 'utilisateur@eventify.com',
      password: passwordUtilisateur,
      name: 'Utilisateur',
      role: 'USER',
    },
  });

  const musique = await prisma.category.create({ data: { name: 'Musique' } });
  const technologie = await prisma.category.create({ data: { name: 'Technologie' } });
  const art = await prisma.category.create({ data: { name: 'Art' } });

  const gratuit = await prisma.tag.create({ data: { name: 'Gratuit' } });
  const enLigne = await prisma.tag.create({ data: { name: 'En ligne' } });
  const vip = await prisma.tag.create({ data: { name: 'VIP' } });

  const evenements = [
    {
      title: 'Soirée Jazz',
      description: 'Profitez d’une soirée de musique jazz.',
      location: 'Paris',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      capacity: 50,
      image: 'https://picsum.photos/400/200?random=1',
      organizerId: organisateur.id,
      categories: [musique],
      tags: [gratuit],
    },
    {
      title: 'Conférence Tech',
      description: 'Dernières tendances en technologie.',
      location: 'San Francisco',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      capacity: 200,
      image: 'https://picsum.photos/400/200?random=2',
      organizerId: organisateur.id,
      categories: [technologie],
      tags: [vip],
    },
    {
      title: 'Exposition d’Art',
      description: 'Présentation d’art moderne.',
      location: 'Londres',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      capacity: 100,
      image: 'https://picsum.photos/400/200?random=3',
      organizerId: organisateur.id,
      categories: [art],
      tags: [enLigne],
    },
    {
      title: 'Concert Rock',
      description: 'Concert de rock en direct.',
      location: 'Berlin',
      date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      capacity: 150,
      image: 'https://picsum.photos/400/200?random=4',
      organizerId: organisateur.id,
      categories: [musique],
      tags: [vip],
    },
    {
      title: 'Atelier IA',
      description: 'Atelier pratique sur l’intelligence artificielle.',
      location: 'New York',
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      capacity: 50,
      image: 'https://picsum.photos/400/200?random=5',
      organizerId: organisateur.id,
      categories: [technologie],
      tags: [enLigne],
    },
    {
      title: 'Cours de Peinture',
      description: 'Apprenez à peindre comme un professionnel.',
      location: 'Rome',
      date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      capacity: 20,
      image: 'https://picsum.photos/400/200?random=6',
      organizerId: organisateur.id,
      categories: [art],
      tags: [gratuit],
    },
  ];

  for (const evt of evenements) {
  const event = await prisma.event.create({
    data: {
      title: evt.title,
      description: evt.description,
      location: evt.location,
      date: evt.date,
      capacity: evt.capacity,
      image: evt.image,
      organizerId: evt.organizerId,
    },
  });

  for (const category of evt.categories) {
    await prisma.eventCategory.create({
      data: {
        eventId: event.id,
        categoryId: category.id,
      },
    });
  }

  for (const tag of evt.tags) {
    await prisma.eventTag.create({
      data: {
        eventId: event.id,
        tagId: tag.id,
      },
    });
  }

  console.log(`Événement créé : ${event.title}`);
}
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });