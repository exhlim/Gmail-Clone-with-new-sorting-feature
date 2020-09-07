const React = require('react')
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

export default class SearchBar extends React.Component {

    render () {
        return (
                <div class="searchbar">
                    <div className="outsideSearch">
                            <img src="./public/search.png" className="searchIcon"/>
                    </div>
                    <input type="text" className="searchbox" placeholder="Search mail"/>
                </div>
            )
    }
}