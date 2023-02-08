export default (isLoading) => {
    console.log(isLoading);
    return(
        <>
            {isLoading && (
                <div className="loading-container">
                    <div className="loading" />
                </div>
            )}
        </>
    );
}
