import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  await prisma.notification.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.photoAlbum.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.association.deleteMany();
  await prisma.user.deleteMany();

  const hashPassword = (password: string) => bcrypt.hash(password, 10);

  console.log('👥 Création des utilisateurs...');

  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@associahub.com',
      password: await hashPassword('admin123'),
      firstName: 'Super',
      lastName: 'Admin',
      globalRole: 'SUPER_ADMIN',
    },
  });

  const president1 = await prisma.user.create({
    data: {
      email: 'president@clubtech.fr',
      password: await hashPassword('president123'),
      firstName: 'Jean',
      lastName: 'Dupont',
      globalRole: 'PRESIDENT',
    },
  });

  const president2 = await prisma.user.create({
    data: {
      email: 'marie@artclub.fr',
      password: await hashPassword('marie123'),
      firstName: 'Marie',
      lastName: 'Martin',
      globalRole: 'PRESIDENT',
    },
  });

  const tresorier = await prisma.user.create({
    data: {
      email: 'tresorier@clubtech.fr',
      password: await hashPassword('tresorier123'),
      firstName: 'Paul',
      lastName: 'Durand',
      globalRole: 'TRESORIER',
    },
  });

  const membre1 = await prisma.user.create({
    data: {
      email: 'membre1@example.com',
      password: await hashPassword('membre123'),
      firstName: 'Sophie',
      lastName: 'Lefebvre',
      globalRole: 'MEMBRE',
    },
  });

  const membre2 = await prisma.user.create({
    data: {
      email: 'membre2@example.com',
      password: await hashPassword('membre123'),
      firstName: 'Thomas',
      lastName: 'Bernard',
      globalRole: 'MEMBRE',
    },
  });

  const visiteur = await prisma.user.create({
    data: {
      email: 'visiteur@example.com',
      password: await hashPassword('visiteur123'),
      firstName: 'Alice',
      lastName: 'Moreau',
      globalRole: 'VISITEUR',
    },
  });

  console.log('🏛️ Création des associations...');

  const clubTech = await prisma.association.create({
    data: {
      name: 'Club Technologie & Innovation',
      slug: 'club-tech-innovation',
      description: 'Association dédiée aux passionnés de technologie et d\'innovation. Nous organisons des conférences, ateliers et événements networking pour partager les dernières tendances tech.',
      logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
      website: 'https://clubtech.fr',
      email: 'contact@clubtech.fr',
      phone: '01 23 45 67 89',
      address: '123 Rue de la Tech, 75001 Paris',
      status: 'ACTIVE',
      isPublic: true,
      createdById: president1.id,
    },
  });

  const artClub = await prisma.association.create({
    data: {
      name: 'Art & Culture Moderne',
      slug: 'art-culture-moderne',
      description: 'Association artistique moderne proposant des expositions, ateliers créatifs et événements culturels. Venez exprimer votre créativité dans un environnement bienveillant.',
      logo: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&crop=center',
      website: 'https://artclubmoderne.fr',
      email: 'contact@artclubmoderne.fr',
      phone: '01 98 76 54 32',
      address: '456 Avenue des Arts, 75002 Paris',
      status: 'ACTIVE',
      isPublic: true,
      createdById: president2.id,
    },
  });

  console.log('🎭 Création des memberships...');

  await prisma.membership.create({
    data: {
      userId: president1.id,
      associationId: clubTech.id,
      role: 'PRESIDENT',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: tresorier.id,
      associationId: clubTech.id,
      role: 'TRESORIER',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: membre1.id,
      associationId: clubTech.id,
      role: 'MEMBRE_ACTIF',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: membre2.id,
      associationId: clubTech.id,
      role: 'MEMBRE',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: president2.id,
      associationId: artClub.id,
      role: 'PRESIDENT',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: membre1.id,
      associationId: artClub.id,
      role: 'MEMBRE',
      status: 'ACTIVE',
    },
  });

  await prisma.membership.create({
    data: {
      userId: visiteur.id,
      associationId: artClub.id,
      role: 'MEMBRE',
      status: 'PENDING',
      notes: 'En attente d\'approbation',
    },
  });

  console.log('📅 Création des événements...');

  const event1 = await prisma.event.create({
    data: {
      title: 'Conférence IA & Machine Learning',
      description: 'Découvrez les dernières avancées en intelligence artificielle et machine learning avec nos experts. Au programme : démonstrations pratiques, retours d\'expérience et networking.',
      location: 'Station F, Paris',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Dans 2 semaines
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4h plus tard
      capacity: 100,
      maxParticipants: 100,
      price: 25.00,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      visibility: 'PUBLIC',
      associationId: clubTech.id,
      organizerId: president1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Atelier Dev Web Modern',
      description: 'Atelier pratique sur les frameworks web modernes : React, Next.js, TypeScript. Apportez votre laptop !',
      location: 'En ligne (Zoom)',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Dans 1 semaine
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      capacity: 30,
      maxParticipants: 30,
      visibility: 'MEMBERS_ONLY',
      associationId: clubTech.id,
      organizerId: tresorier.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'Exposition Art Numérique',
      description: 'Exposition d\'art numérique interactif. Venez découvrir les créations de nos membres artistes.',
      location: 'Galerie Moderne, Marais',
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // Dans 3 semaines
      endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 1 semaine d'expo
      capacity: 200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      visibility: 'PUBLIC',
      associationId: artClub.id,
      organizerId: president2.id,
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: 'Atelier Peinture Abstraite',
      description: 'Atelier créatif de peinture abstraite. Matériel fourni. Ouvert à tous les niveaux.',
      location: 'Atelier Art Club, 456 Avenue des Arts',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      capacity: 15,
      maxParticipants: 15,
      price: 45.00,
      visibility: 'MEMBERS_ONLY',
      associationId: artClub.id,
      organizerId: president2.id,
    },
  });

  // 5. Créer des inscriptions aux événements
  console.log('✅ Création des inscriptions...');

  await prisma.eventRegistration.create({
    data: {
      userId: membre1.id,
      eventId: event1.id,
      paymentStatus: 'PAID',
      paidAt: new Date(),
      amount: 25.00,
    },
  });

  await prisma.eventRegistration.create({
    data: {
      userId: membre2.id,
      eventId: event1.id,
      paymentStatus: 'PENDING',
      amount: 25.00,
    },
  });

  await prisma.eventRegistration.create({
    data: {
      userId: membre1.id,
      eventId: event2.id,
      paymentStatus: 'PAID',
      paidAt: new Date(),
    },
  });

  // 6. Créer des albums photo
  console.log('📸 Création des albums photo...');

  const album1 = await prisma.photoAlbum.create({
    data: {
      associationId: clubTech.id,
      title: 'Conférence DevOps 2024',
      description: 'Photos de notre dernière conférence sur DevOps et Cloud Computing',
      isPublic: true,
      createdById: president1.id,
    },
  });

  const album2 = await prisma.photoAlbum.create({
    data: {
      associationId: artClub.id,
      title: 'Exposition Printemps 2024',
      description: 'Photos de notre exposition de printemps',
      eventId: event3.id,
      isPublic: true,
      createdById: president2.id,
    },
  });

  // 7. Créer quelques photos
  console.log('🖼️ Création des photos...');

  const photos = [
    {
      albumId: album1.id,
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      caption: 'Vue d\'ensemble de la conférence',
      uploadedById: president1.id,
      moderationStatus: 'APPROVED' as const,
    },
    {
      albumId: album1.id,
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      caption: 'Session de questions-réponses',
      uploadedById: membre1.id,
      moderationStatus: 'APPROVED' as const,
    },
    {
      albumId: album2.id,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      caption: 'Œuvre d\'art numérique interactive',
      uploadedById: president2.id,
      moderationStatus: 'APPROVED' as const,
    },
    {
      albumId: album2.id,
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      caption: 'Installation artistique moderne',
      uploadedById: membre1.id,
      moderationStatus: 'PENDING' as const,
    },
  ];

  for (const photo of photos) {
    await prisma.photo.create({ data: photo });
  }

  // 8. Créer des invitations
  console.log('✉️ Création des invitations...');

  await prisma.invitation.create({
    data: {
      associationId: clubTech.id,
      email: 'nouveau@example.com',
      role: 'MEMBRE',
      token: 'invitation-token-1234',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      invitedById: president1.id,
    },
  });

  await prisma.invitation.create({
    data: {
      associationId: artClub.id,
      email: 'artiste@example.com',
      role: 'MEMBRE_ACTIF',
      token: 'invitation-token-5678',
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours
      invitedById: president2.id,
    },
  });

  // 9. Créer des notifications
  console.log('🔔 Création des notifications...');

  const notifications = [
    {
      userId: membre1.id,
      type: 'EVENT_CREATED' as const,
      title: 'Nouvel événement',
      message: 'Un nouvel événement "Conférence IA & Machine Learning" a été créé dans Club Tech',
      entityId: event1.id,
    },
    {
      userId: membre2.id,
      type: 'INVITATION_RECEIVED' as const,
      title: 'Nouvelle invitation',
      message: 'Vous avez été invité à rejoindre Art & Culture Moderne',
      entityId: artClub.id,
    },
    {
      userId: president1.id,
      type: 'MEMBERSHIP_APPROVED' as const,
      title: 'Nouveau membre',
      message: 'Sophie Lefebvre a rejoint votre association',
      entityId: membre1.id,
    },
    {
      userId: president2.id,
      type: 'PHOTO_ADDED' as const,
      title: 'Nouvelle photo',
      message: 'Une nouvelle photo a été ajoutée à l\'album "Exposition Printemps 2024"',
      entityId: album2.id,
    },
  ];

  for (const notification of notifications) {
    await prisma.notification.create({ data: notification });
  }

  console.log('✨ Seeding terminé avec succès !');
  console.log('\n📊 Données créées :');
  console.log(`👥 ${await prisma.user.count()} utilisateurs`);
  console.log(`🏛️ ${await prisma.association.count()} associations`);
  console.log(`🎭 ${await prisma.membership.count()} memberships`);
  console.log(`📅 ${await prisma.event.count()} événements`);
  console.log(`✅ ${await prisma.eventRegistration.count()} inscriptions`);
  console.log(`📸 ${await prisma.photoAlbum.count()} albums photo`);
  console.log(`🖼️ ${await prisma.photo.count()} photos`);
  console.log(`✉️ ${await prisma.invitation.count()} invitations`);
  console.log(`🔔 ${await prisma.notification.count()} notifications`);

  console.log('\n🔐 Comptes de test :');
  console.log('Super Admin: admin@associahub.com / admin123');
  console.log('Président Club Tech: president@clubtech.fr / president123');
  console.log('Présidente Art Club: marie@artclub.fr / marie123');
  console.log('Trésorier: tresorier@clubtech.fr / tresorier123');
  console.log('Membre: membre1@example.com / membre123');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });