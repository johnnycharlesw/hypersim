export class SeriouslyYouDownloadedACarException extends Error {
    constructor(){
        let discountCode = "IWillNeverDownloadACarAgain";
        super(`
            HONK HONK! 
            Use code "${discountCode}" for 20% off, just in case you downloaded Hypersim illegally because of financial barriers.
            If you are just here to try and get voxels for free, maybe try Luanti (it's open-source and legal!)
            If neither is the case, just reinstall Hypersim from either the GitHub repo, Steam, or your Linux distro's package manager (if applicable).
            
            I'd honestly prefer that you play fairly than not at all (but, still, mommy needs the license money to pay taxes, which is why we need it that much!)
            `);
    }
}