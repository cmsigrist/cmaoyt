# API
_Documentation Last Review: 12.03.2023_

## Workflow

```
Frontend          
--------       
    │            
    ▼         
CMAOYT1: Login
    │    
    ▼  
CMAOYT2: NewRecipe 
    │                   
    ▼      
CMAOYT3: GetAllRecipes
    │   
    ▼                                                                            
CMAOYT4: GetRecipe                                                   

```

Each URL is preceded with the URL of the service, cf config in `firebase.ts` 

## CMAOYT1: Login 

## CMAOYT2: NewRecipe
Create a new recipe, store in Realtime DB the json and upload the image to Storage

|        |                                      |
| ------ | ------------------------------------ |
| URL    | `/{type}/{category?}/{id}`           |
| Method | `POST`                               |
| Input  | `application/json`                   |

```json
{
  "id": {<RecipeInfo>}
}
```

Return:

`200 OK` 

## CMAOYT3: GetAllRecipes
Fetch all metadata associated to a type of recipe from Realtime DB:

|        |                                      |
| ------ | ------------------------------------ |
| URL    | `/metadata/{type}`                   |
| Method | `GET`                                |


Return:

`200 OK` 

```object
{
  <DataSnapshot>
}
```

Which contains a list of metadata: `{<Metadata>}[]` 

## CMAOYT4: GetRecipe
Fetch a recipe from Realtime DB, if the recipe has a category:

|        |                                      |
| ------ | ------------------------------------ |
| URL    | `/{type}/category/{category?}/{id}`  |
| Method | `GET`                                |

If not:

|        |                                      |
| ------ | ------------------------------------ |
| URL    | `/{type}/{id}`                       |
| Method | `GET`                                |

Return:

`200 OK` 

```json
{
  "id": {<RecipeInfo>}
}
```