import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ChipInput from "material-ui-chip-input";
import Blogcard from "../components/Blogcard";
import { getAllBlogs, getBlogBySearch } from "../api";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import demo from "../images/demo.jpg";
import nmrk from "../images/nmrk.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditForm from "../components/EditForm.js";
// import background from '../images/blogpalace.jpeg'

const Home = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs();
        console.log("All Blogs: ", response.data);
        setBlogs(response.data);
      } catch (error) {
        console.log("Failed: ", error);
      }
    };

    getBlogs();
  }, []);

  const handleSearch = async () => {
    if (search.trim() || tags.length > 0) {
      console.log(search);
      console.log(tags);
      const response = await getBlogBySearch({ search, tags: tags.join(",") });
      console.log(response);
      setSearchResult(response.data.blogs);
      navigate(
        `/blog/search?searchQuery=${search || "none"}&tags=${
          tags.join() || "none"
        }`
      );
    } else {
      navigate("/");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        backgroundImage: `url("blogpalace.jpeg")`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        zIndex: -5,
      }}
    >
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Box>
          <TextField
            name="search"
            label="Search Blogs"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginRight: 20,
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          />
          <ChipInput
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Search tags"
            variant="outlined"
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            // InputLabelProps={{
            //   style: {
            //     shrink: true,
            //     top: '50%', // Center the label vertically
            //     transform: 'translateY(-50%)', // Adjust the position to perfectly center it
            //     left: '15px',
            //   },
            // }}
          />
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "black",
              color: "white",
              mt: 1,
              ml: 3,
              "&:hover": {
                backgroundColor: "#FFD42F",
                color: "black",
              },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Grid container alignItems={"stretch"} spacing={2} m={4}>
          {searchResult.length > 0 ? (
            <>
              <Typography variant="h5" mb={5}>
                Search Result ({searchResult.length})
              </Typography>
              <Grid container alignItems={"stretch"} spacing={2}>
                {searchResult?.map((blog) => (
                  <Grid key={blog._id} xs={12} sm={6} md={6} lg={4}>
                    <Blogcard data={blog} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h5" mb={5}>
                All Blogs
              </Typography>
              <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
                    <CardMedia
                      component="img"
                      alt="lf2"
                      height="140"
                      image={demo}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Blog 1
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This is my blog. These are the two characters of the
                        1999 game Little Fighter 2 - Freeze and Firen.
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: "20px",
                          lineHeight: "25px",
                          margin: "5px 0",
                          fontWeight: 400,
                        }}
                      > #Tag1 #Tag2
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={handleDelete}>
                        <DeleteIcon />
                      </Button>
                      <Button size="small" onClick={handleOpen}>
                        <EditIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
                    <CardMedia
                      component="img"
                      alt="nmrk"
                      height="140"
                      image={nmrk}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Nam Myoho Renge Kyo
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Nam Myoho Renge Kyo means 'I devote myself to the Lotus
                        Sutra of the Mystic Law. It was proclaimed by a sage
                        Nichiren in the 13th century.'
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: "20px",
                          lineHeight: "25px",
                          margin: "5px 0",
                          fontWeight: 400,
                        }}
                      > #Tag1 #Tag2
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={handleDelete}>
                        <DeleteIcon />
                      </Button>
                      <Button size="small" onClick={handleOpen}>
                        <EditIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              <Grid container alignItems={"stretch"} spacing={2}>
                {blogs.map((blog) => (
                  <Grid key={blog._id} xs={12} sm={6} md={6} lg={4}>
                    <Blogcard data={blog} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
