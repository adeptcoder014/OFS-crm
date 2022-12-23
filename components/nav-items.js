import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useTheme } from '@mui/styles';
//===========================================================
export const NavItem = (props) => {
  //==================
  const { href, isCollapsible, icon, title, items, ...others } = props;
  const router = useRouter();

  const active = href
    ? router.pathname.split('/')[1] === href.split('/')[1]
    : false;
    //=======================================================
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,  
        // ml:2
      }}
    >

      {isCollapsible ? (
        <Accordion sx={{ backgroundColor: 'transparent', width: '100%' }}>
          <Button
            component="div"
            startIcon={icon}
            // disableRipple
            sx={

              {
                backgroundColor:  'white',
             
                mb: 2,
                borderRadius: 10,
                color: 'gray',
                fontWeight:  'fontWeightBold',
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                width: '100%',
               
            
              }
            }
          >
            <>
              <NextLink href={href} passHref>
                <Box sx={{ flexGrow: 1 }}>{title}</Box>
              </NextLink>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              ></AccordionSummary>
            </>
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {items?.map((x) => (
              <Button onClick={() => router.push(x.href)} key={x.title}>
                <Typography
                  sx={{
                    color: 'gray',
                    fontWeight: 'bold',
                  }}
                >
                  {x.title}
                </Typography>
              </Button>
            ))}
          </div>
        </Accordion>
      ) : (
        <>
          <NextLink href={href} passHref>
            <Button
              component="div"
              startIcon={icon}
              disableRipple

              sx={[
                {
                 
                  borderRadius: 1,
                  color:  'gray',
                  fontWeight:'fontWeightBold',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  textTransform: 'none',
                  width: '100%',
                  '& .MuiButton-startIcon': {
                    color:  'grey',
                  },
                
                },
              ]}
            >
            
              <Box sx={{ flexGrow: 1 }}>{title}</Box>
            </Button>
          </NextLink>
        </>
      )}
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
