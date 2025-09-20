import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ArrowRight, BookOpen } from "lucide-react";
import { knowledgeGraph } from "@/data/mockData";

const KnowledgeGraph = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">Knowledge Graph</h1>
          <p className="text-xl text-muted-foreground">Navigate your learning journey</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(knowledgeGraph).map(([subject, data], subjectIndex) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: subjectIndex * 0.2 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.topics.map((topic, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{topic.title}</h3>
                        {topic.completed ? (
                          <Badge variant="default" className="bg-success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        {topic.subtopics.map((subtopic, subIndex) => (
                          <div key={subIndex} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{subtopic}</span>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;