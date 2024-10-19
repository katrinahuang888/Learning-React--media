import classNames from 'classnames';

// times === type = "number"
function Skeleton({ times, className }) {
    const outerClassNames = classNames(
        'relative', // positions inner element absolutely
        'overflow-hidden', // hides inner element if not overlapping
        'bg-gray-200',
        'rounded',
        'mb-2.5', // margins
        className
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute', 
        'inset-0', // expands to fill outer div
        '-translate-x-full', // gets inner div to move off far LHS of outer div
        'bg-gradient-to-r', // change colors in x direction towards RHS
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );

    // creates a new array with length of times prop
    // iterates over array and for every element, we 
    // create a div and returns it

    const boxes = Array(times)
        .fill(0)
        .map((_, i) => {
            return (
                <div key={i} className={outerClassNames} >
                    <div className={innerClassNames} />
                </div>
            );
    });

    return boxes;
};

export default Skeleton;