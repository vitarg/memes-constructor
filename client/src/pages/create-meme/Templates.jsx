import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getTemplates, selectTemplate } from "../../redux/features/templates";

const Templates = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.templates.loading);
  const templates = useSelector((state) => state.templates.items);


  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  const handleSelectImage = (template) => {
    dispatch(selectTemplate(template));
  };

  if (loading) return <CircularProgress />;

  if (templates.length === 0)
    return <Typography>Нет ни одного шаблона</Typography>;

  return (
    <Grid container spacing={4}>
      {templates.map((item) => {
        return (
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Paper>
              <Card>
                <CardMedia component="img" image={item.img} alt="item" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.tags.map((e) => "#" + e + " ")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleSelectImage(item)}
                    color={"primary"}
                    variant={"contained"}
                    size="medium"
                  >
                    Выбрать
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Templates;
