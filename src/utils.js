

export const parseImage = (image, end) => {
    return image.indexOf('https') >= 0? `${image}` : `/assets/images/${end}/${image}`;
}