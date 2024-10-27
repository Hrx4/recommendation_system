import {VoyageEmbeddings} from '@langchain/community/embeddings/voyage';

const embedding = new VoyageEmbeddings({
    apiKey : "pa-yGCmCNeYMCEjhfNM2qGe0MkUn0Dewoo7NTzZSalO3f4",
    inputType : "query",
});

export const embed = async(descriptionQuery : string)=>{
    const embeddingResult = await embedding.embedQuery(descriptionQuery);
    return embeddingResult;
}