import * as React from "react"
import { List as ListContainer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import FunctionsIcon from '@mui/icons-material/Functions'

export const List = () => (<ListContainer>
	<ListItem disablePadding>
		<ListItemButton component="a" href="#/addition">
			<ListItemIcon>
				<AddIcon />
			</ListItemIcon>
			<ListItemText primary="Addition" />
		</ListItemButton>
	</ListItem>
	<ListItem disablePadding>
		<ListItemButton component="a" href="#/prime">
			<ListItemIcon>
				<FunctionsIcon />
			</ListItemIcon>
			<ListItemText primary="Prime" />
		</ListItemButton>
	</ListItem>
</ListContainer>)