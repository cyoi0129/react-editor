import { VFC, useEffect } from 'react';
import { Typography, Stack, Box, List, ListItem, ListItemText, ListItemIcon, Divider, Slide, Grow, Zoom, Container } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as ReactIcon } from '../images/react.svg';
import { ReactComponent as ReduxIcon } from '../images/redux.svg';
import { ReactComponent as FirebaseIcon } from '../images/firebase.svg';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import Data from '../app/data.json';
import { RenderTree } from '../app/types';

const Home: VFC = () => {
  const navigate = useNavigate();
  const data: RenderTree = Data.files;
  const codeExample = Data.codes;
  const renderTree = (nodes: RenderTree) => (
    <TreeItem sx={{ lineHeight: 2, fontSize: 18 }} key={nodes.id} nodeId={nodes.id} label={nodes.name} icon={Array.isArray(nodes.children) ? <FolderIcon /> : <ArticleIcon />}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
  return (
    <Container sx={{ mt: 2, maxWidth: 900 }}>
      <Typography variant="h4" component="h1">Architecture</Typography>
      <Typography sx={{ p: 1 }} variant="h5" component="h2">Frontend</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="flex-start" alignItems="center">
        <Box sx={{ minWidth: 300, textAlign: 'center' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="React Typescript uses Hooks" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Redux &amp; redux-dev tools for state management" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Use Editor.js for contents" />
            </ListItem>
          </List>
        </Box>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box sx={{ minWidth: 130, textAlign: 'center' }}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <ReactIcon />
            </Slide>
          </Box>
          <Grow in={true} style={{ transitionDelay: '500ms' }}>
            <AddCircleIcon sx={{ fontSize: 72, color: '#777', mx: 2 }} />
          </Grow>
          <Box sx={{ minWidth: 120, textAlign: 'center' }}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <ReduxIcon />
            </Slide>
          </Box>
        </Stack>
      </Stack>
      <Divider component="div" sx={{ my: 4 }} />
      <Typography sx={{ p: 1 }} variant="h5" component="h2">Server</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="flex-start" alignItems="center">
        <Box sx={{ width: 300, textAlign: 'center' }}>
          <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <FirebaseIcon />
          </Zoom>
        </Box>
        <Box sx={{ minWidth: 300, textAlign: 'center' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Firebase Authtication for user management" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Firebase stroage for Image &amp; file upload" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Realtime database for CRUD API" />
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Divider component="div" sx={{ my: 4 }} />
      <Typography sx={{ py: 1 }} variant="h5" component="h2">Frontend Source Tree</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="flex-start" alignItems="center">
        <Box sx={{ mx: 1, minWidth: 300 }} >
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, overflowY: 'auto', ml: 1 }}
          >
            {renderTree(data)}
          </TreeView>
        </Box>
        <Box>
          <pre className="prettyprint lang-js"
            dangerouslySetInnerHTML={{
              __html: `<code>${codeExample}</code>`
            }}></pre>
        </Box>
      </Stack>
    </Container>
  );
}

export default Home;