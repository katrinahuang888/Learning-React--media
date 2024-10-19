import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ user }) {
    // data: actual data returned by API
    // error: null if no errors or error object if something went wrong
    // isLoading: boolean, true if in the process of making a request
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    
    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if (isFetching) {
        content = <Skeleton times={3} className="h-10 w-4" />
    } else if (error) {
        content = <div>Error loading albums...</div>
    } else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />
        });
    };

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between" >
                <h3 className="text-lg font-bold" >Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading} >
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
};

export default AlbumsList;