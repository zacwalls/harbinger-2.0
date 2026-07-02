export default interface Class {
    Thumbnail: [{
        id: number,
        documentId: string,
        name: string,
        alternativeText: null,
        caption: null,
        focalPoint: null,
        width: null,
        height: null,
        formats: null,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: string | null,
        provider: string,
        provider_metadata: string | null,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }];
    Cover: string;
    Name: string;
    Excerpt: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}