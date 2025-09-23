export function invitationEmailTemplate(name: string, association: string, link: string) {
  return `
    <h2>Bonjour ${name},</h2>
    <p>Vous avez été invité à rejoindre l'association <strong>${association}</strong>.</p>
    <p>Pour accepter l'invitation, cliquez sur le lien suivant :</p>
    <a href="${link}" style="padding:10px 20px;background-color:#2563EB;color:white;border-radius:5px;text-decoration:none;">Accepter</a>
    <p>Merci,</p>
    <p>Associahub Team</p>
  `;
}

export function eventCreatedEmailTemplate(eventTitle: string, associationName: string, link: string) {
  return `
    <h2>Nouvel événement : ${eventTitle}</h2>
    <p>L'association <strong>${associationName}</strong> a créé un nouvel événement.</p>
    <p>Pour plus de détails, cliquez ici : <a href="${link}" style="color:#2563EB;">Voir l'événement</a></p>
  `;
}