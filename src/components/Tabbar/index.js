import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "@mui/styles";
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderBottom: `1px solid ${theme.palette.gray[700]}`,
        '& .MuiTabs-indicator': {
            border: '1px solid transparent',
            borderTopLeftRadius: theme.spacing(10),
            borderTopRightRadius: theme.spacing(10),
            height: '0.2rem',
        },
    }
}))

const Tabbar = ({ data }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index } = props;

        return (
            value === index && (
                <Box pb={3} pt={3}>
                    <Typography>{children}</Typography>
                </Box>
            )
        )
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };


    return (
        <>
            <AppBar position="static" elevation={0} color="transparent">

                <Tabs indicatorColor="primary" textColor="primary" value={value} onChange={handleChange} variant="scrollable" className={classes.tabs}>
                    {data.map((tab) => {
                        return (<Tab label={tab.title} />)
                    })}
                </Tabs>
            </AppBar>
            {data.map((tab, index) => {
                return (
                    <TabPanel value={value} index={index}>
                        {tab.component}
                    </TabPanel>
                )
            })}
        </>
    )
}

export default Tabbar
