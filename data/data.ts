const currentYear = new Date().getFullYear();
const data = {
    sitename: "Manhood Aura",
    sitetagline: "Something great is on the way! ✨ 🔥",
    siteurl: "https://manhoodaura.com",
    sitelogo: "",
    title: "Coming Soon!",
    description: "We&apos;re currently working hard to bring you something great, and we can&apos;t wait to share it with you.",
    // Our team is putting the finishing touches on a new project 🚀 that we think you&apos;ll love 😍.
    newsletterheading: "Stay tuned for our live updates!",
    copyrightText: `Copyright © ${currentYear} | Design and Developed By &nbsp;<a target="_blank" class="no-underline md:underline" href="https://github.com/mirzaahtsham">Mirza Ahtsham</a>`,
    socialIconsHeading: "Follow Us 📣",
    hideSubscribeForm: false, // make true to disable subscription form 
    socialIcons: [
        {
            icon: "facebook",
            link: "https://www.facebook.com/",
        },
        {
            icon: "twitter",
            link: "https://twitter.com/",
        },
        {
            icon: "linkedIn",
            link: "https://www.linkedin.com/",
        },
    ],
    hide :{
        subscribeForm: false, // make true to disable subscription form         
        header: false,
        content: false,
        footer: false,
    }
}

export default data;
