import { fetchFavoritesGraphQL, checkIsFavoriteGraphQL } from '../graphql/queries';
import { addToFavoritesGraphQL, removeFromFavoritesGraphQL } from '../graphql/mutations';

export const addToFavorites = async (productId: string): Promise<void> => {
    try {
        console.log('🔄 Adding to favorites via GraphQL...');
        await addToFavoritesGraphQL(productId);
        console.log('✅ Added to favorites successfully via GraphQL');
    } catch (error) {
        console.error('❌ Error adding to favorites via GraphQL:', error);
        throw error;
    }
};

export const removeFromFavorites = async (productId: string): Promise<void> => {
    try {
        console.log('🔄 Removing from favorites via GraphQL...');
        await removeFromFavoritesGraphQL(productId);
        console.log('✅ Removed from favorites successfully via GraphQL');
    } catch (error) {
        console.error('❌ Error removing from favorites via GraphQL:', error);
        throw error;
    }
};

export const fetchUserFavorites = async (): Promise<string[]> => {
    try {
        console.log('🔄 Fetching favorites via GraphQL...');
        const favorites = await fetchFavoritesGraphQL();
        console.log('✅ Favorites fetched successfully via GraphQL:', favorites);
        return favorites;
    } catch (error) {
        console.error('❌ Error fetching favorites via GraphQL:', error);
        throw error;
    }
};

export const checkIsFavorite = async (productId: string): Promise<boolean> => {
    try {
        console.log('🔄 Checking favorite status via GraphQL...');
        const isFavorite = await checkIsFavoriteGraphQL(productId);
        console.log('✅ Favorite status checked via GraphQL:', isFavorite);
        return isFavorite;
    } catch (error) {
        console.error('❌ Error checking favorite status via GraphQL:', error);
        return false;
    }
};