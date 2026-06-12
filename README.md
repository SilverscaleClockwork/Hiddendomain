# Hiddendomain
<https://hiddendoma.in> a webpage between the seems.
The content human made. The performance at 98% and that without writing new code for every step.

## How it works
Basic explaination being that when I update the Data within the CMS, this Project is automatically used to generate a webpage. The system uses Cloudflare Pages and a CDN (in this case Bunny).

Things that happen if update the blog or the main branch.
0. The CDN sends a webhook to the cloudflare service to update the page or cloudflare detects a change in main.
0. Cloudflare pulls the latest main branch commit.
0. Cloudflare builds a new version while keeping the old one active.
0. If the build succeeds cloudflare switches the old with the new content.

## Security
Cloudflare and Bunny give a few tools to manage security, I basically don't need to implement security features into this page because the site is entirely static, and if I need moving parts at some point it will be light javascript.

Of course I noticed that there are some automated scrapers, some for AI systems and some from script kiddies trying to find weakspots in new websites.


## Performance
It's static there is no drawbacks when it comes to performance. Also the setup is on the Edge, you are always closest to the next available source.

## Images CMS & CDN

The most complicated part about this page is just the link swapout. By default the CMS uses it's own domain to host images and link to them without an easy way to change it. So I made a workaround astro service object that swaps the domain of the cms with the domain of the cdn, simple and effective. That is necessary because the cms is only meant to store the data for the build step and be decoupled from everything else.