// basic
import { VFC, useState, useContext, ChangeEvent } from 'react';
// components
import { DataContext } from '../App';
import { ImageList } from './';
import { masterItem, PostInfoProps } from '../app/types';
import { getMasterNameByID, getMasterIDByName, convertDate } from '../app/utils';
// 3rd party library
import { uploadFile } from '../app/firebase';
import { Theme, useTheme, styled, Box, TextField, FormControl, Select, MenuItem, OutlinedInput, Chip, SelectChangeEvent, Stack, IconButton, InputLabel, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const PostInfo: VFC<PostInfoProps> = (Props) => {
  const theme = useTheme();
  const tagList = useContext(DataContext).tags;
  const categoryList = useContext(DataContext).categories;
  const { postInfo, changePostInfo } = Props;
  const currentID: string = postInfo.id === '' ? 'New Post' : 'Post ID: ' + postInfo.id;
  const initTagList = postInfo.id === '' ? [] : postInfo.tag.map(tagItem => getMasterNameByID(tagItem, tagList));
  const initCategory = postInfo.id === '' ? '' : getMasterNameByID(postInfo.category, categoryList);
  const initDate = postInfo.date === '' ? new Date() : new Date(postInfo.date);
  const [title, setTitle] = useState<string>(postInfo.title);
  const [description, setDescription] = useState<string>(postInfo.description);
  const [date, setDate] = useState<Date | null>(initDate);
  const [thumbnail, setThumbnail] = useState<string>(postInfo.thumbnail);
  const [category, setCategory] = useState<string>(initCategory);
  const [selectedTagList, setSelectedTagList] = useState<string[] | []>(initTagList);
  const [showImageLibrary, setShowImageLibrary] = useState<boolean>(false);

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    changePostInfo('title', event.target.value);
    setTitle(event.target.value);
  };

  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    changePostInfo('description', event.target.value);
    setDescription(event.target.value);
  };

  const changeDate = (newDate: Date | null) => {
    setDate(newDate);
    const dateStr = newDate === null ? '' : convertDate(newDate).dateString;
    changePostInfo('date', dateStr);
  }

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
    if (result.name) {
      setThumbnail(result.url);
    } else {
      console.log('Upload failed');
    }
  }

  const removeThumbnail = () => {
    setThumbnail('');
  }

  const changeThumbnailByURL = (url: string) => {
    setThumbnail(url);
  }
  const openImageLibrary = () => {
    setShowImageLibrary(true);
  }

  const closeImageLibrary = () => {
    setShowImageLibrary(false);
  }

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

  return (
    <>
      <Stack sx={{ maxWidth: 720 }}>
        <Typography variant="h6" component="h1" sx={{ p: 1 }}>{currentID}</Typography>
        <TextField onChange={changeTitle} label="Title" value={title} multiline sx={{ m: 1 }} />
        <TextField onChange={changeDescription} label="Description" value={description} multiline sx={{ m: 1 }} />
        <FormControl sx={{ m: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={changeCategory}
          >
            {(categoryList as Array<masterItem>).map((categoryItem) => (
              <MenuItem value={categoryItem.name} key={categoryItem.id}>{categoryItem.name}</MenuItem>
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
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {(tagList as Array<masterItem>).map((tagItem) => (
              <MenuItem
                value={tagItem.name}
                key={tagItem.id}
                style={getStyles(tagItem.name, selectedTagList, theme)}
              >
                {tagItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Public date"
              value={date}
              onChange={(newValue) => {
                changeDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1" sx={{ ml: 1 }}>Thumbnail</Typography>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => changeThumbnail(event)} />
            <IconButton aria-label="upload image" component="span">
              <CloudUploadIcon />
            </IconButton>
          </label>
          <IconButton sx={{ m: 0 }} aria-label="select image" component="span" onClick={openImageLibrary}>
            <InsertPhotoIcon />
          </IconButton>
          {thumbnail !== '' ?
            <IconButton sx={{ m: 0 }} aria-label="select image" component="span" onClick={removeThumbnail}>
              <DeleteIcon />
            </IconButton>
            :
            null}
        </Stack>
        <Box sx={{ mx: 2 }}>
          {thumbnail !== '' ? <img src={thumbnail} width={160} height="auto" alt="Thumbnail" /> : <Typography variant="body2" color="GrayText">No Image</Typography>}
        </Box>
      </Stack>
      <ImageList show={showImageLibrary} close={closeImageLibrary} changeImage={changeThumbnailByURL} />
    </>
  )
}

export default PostInfo;