import { VFC, useState, useContext, ChangeEvent } from 'react';
import { DataContext } from '../App';
import { Theme, useTheme, styled, Box, TextField, FormControl, Select, MenuItem, OutlinedInput, Chip, SelectChangeEvent, Stack, IconButton, InputLabel, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { masterItem, postInfo } from '../features/types';
import { getMasterNameByID, getMasterIDByName } from '../app/utils';
import { uploadFile, downloadFile } from '../app/firebase';

export type Props = {
  postInfo: postInfo;
  changePostInfo: any;
}

const PostInfo: VFC<Props> = (Props) => {
  // UI setting
  const theme = useTheme();
  const Input = styled('input')({
    display: 'none',
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const getStyles = (name: string, personName: readonly string[], theme: Theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // Data
  const { postInfo, changePostInfo } = Props;

  const categoryList = useContext(DataContext).categories.categories;
  const tagList = useContext(DataContext).tags.tags;

  const currentID: string = postInfo.id === 0 ? 'New Post' : 'ID: ' + postInfo.id;

  const [title, setTitle] = useState<string>(postInfo.title);
  const [description, setDescription] = useState<string>(postInfo.description);
  const [thumbnail, setThumbnail] = useState<string>(postInfo.thumbnail);
  const [category, setCategory] = useState<string>(getMasterNameByID(postInfo.category, categoryList));
  const [selectedTagList, setSelectedTagList] = useState<string[]>(postInfo.tag.map(tagItem => getMasterNameByID(tagItem, tagList)));

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    changePostInfo('title', event.target.value);
    setTitle(event.target.value);
  };

  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    changePostInfo('description', event.target.value);
    setDescription(event.target.value);
  };

  const changeCategory = (event: SelectChangeEvent) => {
    const targetCateogry: number = getMasterIDByName(event.target.value, categoryList);
    changePostInfo('category', targetCateogry);
    setCategory(event.target.value as string);
  };

  const changeTagList = (event: SelectChangeEvent<typeof selectedTagList>) => {
    const tagArray = (event.target.value as []).map(tag => getMasterIDByName(tag, tagList));
    changePostInfo('tag', tagArray);
    const {
      target: { value },
    } = event;
    setSelectedTagList(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const changeThumbnail = async (event: any) => {
    const result = await uploadFile(event.target.files[0]);
    if (result.success === 1) {
      setThumbnail(result.file.url);
    } else {
      console.log('Upload failed');
    }
  }

  return (
    <>
      <Stack sx={{ maxWidth: 720 }}>
        <Typography variant="h6" component="h1" sx={{ p: 1 }}>{currentID}</Typography>
        <TextField onChange={changeTitle} value={title} multiline sx={{ m: 1 }} />
        <TextField onChange={changeDescription} value={description} multiline sx={{ m: 1 }} />
        <FormControl sx={{ m: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={changeCategory}
          >
            {(categoryList as Array<masterItem>).map((categoryItem) => (
              <MenuItem value={categoryItem.name}>{categoryItem.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel>Tag</InputLabel>
          <Select
            multiple
            value={selectedTagList}
            onChange={changeTagList}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {(tagList as Array<masterItem>).map((tagItem) => (
              <MenuItem
                value={tagItem.name}
                style={getStyles(tagItem.name, selectedTagList, theme)}
              >
                {tagItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => changeThumbnail(event)} />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body1">Thumbnail</Typography>
        </Stack>
        <Box sx={{ mx: 2 }}>
          {thumbnail !== '' ? <img src={thumbnail} width={160} height={120} /> : <Typography variant="body2" color="GrayText">No Image</Typography>}
        </Box>
      </Stack>
    </>
  )
}

export default PostInfo;