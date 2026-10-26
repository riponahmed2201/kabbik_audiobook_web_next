/** Guest JWT for anonymous API access — set in `.env`, not in git. */
const guestApiToken = process.env.NEXT_PUBLIC_GUEST_API_TOKEN ?? "";

export const siteConfig = {
    name: 'Kabbik',
    domain:"kabbik.com",
    description: 'Your go-to platform for all things Kabbik',
    url: 'https://kabbik.com',
    logo: '/assets/logo.png',
    smallLogo:'/assets/logoSmall_2.png',
    placeholder_img:`/assets/placeholderBook.jpg`,
    logoWithoutKabbik:'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/logo.svg',
    defaultToken: guestApiToken,
    defaultUserId: process.env.NEXT_PUBLIC_GUEST_USER_ID ?? "2820",
    placeholderBook:"https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/bookPlaceholder.jpg",
    defaultProfilePic:"https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/profile.svg",
    defaultPremiumPic:"https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/image323231.png",
    socialLinks: {
        facebook: 'https://facebook.com/kabbik',
        twitter: 'https://twitter.com/kabbik',
        instagram: 'https://instagram.com/kabbik',
        linkedin: 'https://linkedin.com/company/kabbik'
    },
}